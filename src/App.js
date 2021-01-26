import React from 'react';
import { useState } from 'react';
import FormData from "form-data";
import axios from "axios";
import { Button, Container, Grid } from '@material-ui/core';

function App() {
  const [images, setImages] = useState([]);
  const fileHandler = (e) => {
    const [aFile] = e.target.files;
    const reader = new FileReader();

    reader.readAsDataURL(aFile);
    reader.onload = () => {
      const data = {
        name: aFile.name,
        imageData: reader.result
      }
      setImages(prev => [...prev, data]);
    }
  };

  const fileSender = async () => {
    if (!images || images.length === 0) {
      alert('Select at least 1 image.');
      return;
    }
    try {
      for (const image of images) {
        const formData = new FormData();
        formData.append('image', image.imageData);
        formData.append('name', image.name);
        const res = await axios.post(
          'upload.php',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        console.log(res);
      }
      alert(`Saved ${images.length} files.`)
      setImages([]);
      const el = document.querySelector("#file1");
      el.value = null;
    } catch (err) {
      console.error(err);
    }
  };

  const deleteImage = (index) => {
    const newImages = images.filter((v, i) => i !== index);
    setImages(newImages);
  };

  const ImageList = (props) => {
    const { images } = props;
    if (!images || images.length === 0) {
      return null;
    }
    return images && images.length > 0 && images.map((image, index) => (
      <div key={index}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => deleteImage(index)}
        >
          DELETE
        </Button>
        <br/>
        <img src={image.imageData} alt=""/>
      </div>
    ));
  }
  
  return (
    <div className="App">
      <Container style={{'margin': '20px'}}>
        <Button component="label" variant="contained">
          Upload
          <input id="file1" type="file" multiple
            hidden onChange={fileHandler.bind(this)}/>
        </Button>
        <Grid
          style={{'margin': '20px'}}
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <ImageList images={images}/>
        </Grid>
        <Button variant="contained" color="primary" onClick={fileSender}>Save</Button>
      </Container>
    </div>
  );
}

export default App;
