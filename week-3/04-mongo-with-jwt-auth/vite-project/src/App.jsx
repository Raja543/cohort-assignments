// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSignInForm from "./components/AdminSigninForm";

const App = () => {
  const [courses, setCourses] = useState([]);
  const [token, setToken] = useState('');
  const [adminCredentials, setAdminCredentials] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    const fetchCourses = async () => {
      // Check if the token is available
      if (!token) {
        console.error('Token not available. Please sign in.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/admin/courses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [token]);

  const handleAdminSignIn = async () => {
    try {
      const response = await axios.post('http://localhost:3000/admin/signin', {
        username: adminCredentials.username,
        password: adminCredentials.password,
      });
      console.log('Token:', response.data.token);
      setToken(response.data.token);
    } catch (error) {
      console.error('Error signing in as admin:', error.response?.data || error.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAdminCredentials({
      ...adminCredentials,
      [name]: value,
    });
  };

  return (
    <div>
      <h1>Course Management System</h1>
      <AdminSignInForm
        credentials={adminCredentials}
        onInputChange={handleInputChange}
        onSignIn={handleAdminSignIn}
      />
      <h2>Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course._id}>{course.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
