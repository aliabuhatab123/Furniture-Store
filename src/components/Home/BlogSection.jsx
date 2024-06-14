import React from 'react';
import { Link } from 'react-router-dom';

const BlogSection = () => {
  const blogs = [
    {
      id: 1,
      title: 'Blog Post 1',
      description: 'This is a brief description of blog post 1. It gives an overview of the content and entices the reader to click and read more.',
      link: '/blog/1',
      image: 'https://via.placeholder.com/400x200' // Replace with actual image URL
    },
    {
      id: 2,
      title: 'Blog Post 2',
      description: 'This is a brief description of blog post 2. It gives an overview of the content and entices the reader to click and read more.',
      link: '/blog/2',
      image: 'https://via.placeholder.com/400x200' // Replace with actual image URL
    },
    {
      id: 3,
      title: 'Blog Post 3',
      description: 'This is a brief description of blog post 3. It gives an overview of the content and entices the reader to click and read more.',
      link: '/blog/3',
      image: 'https://via.placeholder.com/400x200' // Replace with actual image URL
    }
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Blog</h2>
          <p className="text-lg text-gray-700">Stay updated with the latest news and articles from our blog.</p>
        </div>
        <div className="flex flex-wrap -mx-4">
          {blogs.map(blog => (
            <div key={blog.id} className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{blog.title}</h3>
                  <p className="text-gray-700 mb-4">{blog.description}</p>
                  <Link to={blog.link} className="text-blue-500 hover:text-blue-700 font-semibold">Read more</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
