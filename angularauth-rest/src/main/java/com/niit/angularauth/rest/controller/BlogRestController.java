package com.niit.angularauth.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.niit.angularauth.backend.dao.BlogDAO;
import com.niit.angularauth.backend.model.Blog;
import com.niit.angularauth.backend.model.User;


@RestController
public class BlogRestController {

	@Autowired
	BlogDAO blogDAO;
	
	//-------------------Retrieve All Blogs--------------------------------------------------------
    
			@GetMapping(value="/blog/")
		    public ResponseEntity<List<Blog>> listAllBlogs() {
		        List<Blog> blogs = blogDAO.listBlogs();
		        if(blogs.isEmpty()){
		            return new ResponseEntity<List<Blog>>(HttpStatus.NO_CONTENT);//You many decide to return HttpStatus.NOT_FOUND
		        }
		        return new ResponseEntity<List<Blog>>(blogs, HttpStatus.OK);
		    }
	
			
			//-------------------Retrieve Single Blog--------------------------------------------------------
		    
			@GetMapping(value="/blog/{id}",produces=MediaType.APPLICATION_JSON_VALUE)
		    public ResponseEntity<Blog> getBlog(@PathVariable("id") long id) {
		        
		        Blog blog = blogDAO.getBlogByBlogId(id);
		        if (blog == null) {
		            
		            return new ResponseEntity<Blog>(HttpStatus.NOT_FOUND);
		        }
		        return new ResponseEntity<Blog>(blog, HttpStatus.OK);
		    }
			
			
			//-------------------Create a Blog--------------------------------------------------------
		    
			@PostMapping(value = "/blog/")
		    public ResponseEntity<Void> createBlog(@RequestBody Blog blog) {
		  
		        blogDAO.addBlog(blog);
		  
		       
		        return new ResponseEntity<Void>(HttpStatus.CREATED);
		    }
			
			
			 //------------------- Update a User --------------------------------------------------------
		    
			@PutMapping(value = "/blog/{id}")
		    public ResponseEntity<Blog> updateBlog(@PathVariable("id") long id, @RequestBody Blog blog) {
		      
		          
		        Blog currentBlog = blogDAO.getBlogByBlogId(id);
		          
		        if (currentBlog==null) {
		            
		            return new ResponseEntity<Blog>(HttpStatus.NOT_FOUND);
		        }
		  
		        currentBlog.setTitle(blog.getTitle());
		        currentBlog.setDescription(blog.getDescription());
		       
		        
		          
		        blogDAO.updateBlog(currentBlog);
		        return new ResponseEntity<Blog>(currentBlog, HttpStatus.OK);
		    }
		  
			
			//------------------- Delete a User --------------------------------------------------------
		    @DeleteMapping(value = "/blog/{id}")
		    public ResponseEntity<Blog> deleteBlog(@PathVariable("id") long id) {
		        		  
		        Blog blog = blogDAO.getBlogByBlogId(id);
		        if (blog == null) {
		            
		            return new ResponseEntity<Blog>(HttpStatus.NOT_FOUND);
		        }
		  
		        blogDAO.deleteBlog(blog);
		        return new ResponseEntity<Blog>(HttpStatus.NO_CONTENT);
		    }
		    
	
}
