let data = JSON.parse(localStorage.getItem("users")) || [
    
    {
      email: "javier.mauri.gomez@gmail.com",
      password: "123123",
      aprobbed: true
    },
  ];
  
  export default data;
  