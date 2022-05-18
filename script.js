// Unsplash API

const count = 10;
const apiKey = "JLaFFFFk1XwHSR_xY8Qt4WBvbk5HoA9y66ThRtX6x8w";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get Photos from Unsplash API

const getPhotos = async function () {
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    console.log(data);
  } catch (error) {
    //catch error
  }
};

// On Load
getPhotos();

