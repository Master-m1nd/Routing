import { render, screen } from '@testing-library/react';
import Post from "../components/Post.jsx";
import {BrowserRouter as Router} from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

test('Post has title', () => {
  const posts = [
    {
      id: 1,
      title: 'Post 1 Title',
      description: 'Post 1 Description',
      author: {
        name: 'Author 1 Name',
        position: 'Author 1 Position',
        avatar: 'Author 1 Avatar'
      },
      text: 'Post 1 Text',
      published_at: '2022-01-01T00:00:00.000Z',
      reading_time: 5,
      image: 'Post 1 Image'
    },
    {
      id: 2,
      title: 'Post 2 Title',
      description: 'Post 2 Description',
      author: {
        name: 'Author 2 Name',
        position: 'Author 2 Position',
        avatar: 'Author 2 Avatar'
      },
      text: 'Post 2 Text',
      published_at: '2022-01-02T00:00:00.000Z',
      reading_time: 10,
      image: 'Post 2 Image'
    }];
  render(
  <Router>
      <Post posts={posts}/>
  </Router>);
  const titleElement = screen.getByText(/Post 1 Title/i);
  expect(titleElement).toBeInTheDocument(); 
});
