import { useState, useEffect } from 'react';
import { useFile } from './useFile';

function App() {
  const [images, setImages] = useState([]);
  const fileHandler = (e) => {
    const { files } = e.target;
    const [aFile] = files;

    const reader = new FileReader();
    reader.readAsDataURL(aFile); // データURLスキーム取得処理を非同期で開始する
  
    // データURLスキームを取得後に実行される処理
    reader.onload = (e) => {
      // const img1 = document.querySelector('#img1');
      // img1.setAttribute('src', reader.result);
      console.log({result: reader.result});
      setImages(prev => [...prev, reader.result]);
    }
  };

  const fileSender = async () => {
    try {
      const php = await fetch(
        '/upload.php',
        {
          body: images[0],
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          method: 'POST',
        }
      );
      console.log(php);
    } catch (err) {
      console.error(err);
    }
  }
  
  return (
    <div className="App">
      <input id="file1" type="file" multiple onChange={fileHandler.bind(this)}/><br/>
      {images && images.length > 0 && images.map((image, index) => (
        <img id={`img1${index}`} key={index} src={image} alt=""/>
      ))}
      <button onClick={fileSender}>post</button>
    </div>
  );
}

export default App;
