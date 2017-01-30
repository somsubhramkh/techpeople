package com.niit.angularauth.rest.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

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

import com.niit.angularauth.backend.dao.FriendDAO;
import com.niit.angularauth.backend.dao.UserDAO;
import com.niit.angularauth.backend.model.User;

@RestController
public class UserRestController {
	
	@Autowired
	UserDAO userDAO;
	
	@Autowired
	FriendDAO friendDAO;
	
	//-------------------Retrieve All Users--------------------------------------------------------
    
		@GetMapping(value="/user/")
	    public ResponseEntity<List<User>> listAllUsers() {
	        List<User> users = userDAO.listUsers();
	        if(users.isEmpty()){
	            return new ResponseEntity<List<User>>(HttpStatus.NO_CONTENT);//You many decide to return HttpStatus.NOT_FOUND
	        }
	        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
	    }
		
		//-------------------Retrieve All Users except the current user--------------------------------------------------------
	    
			@GetMapping(value="/user/friend/")
		    public ResponseEntity<List<User>> listAllUsersExceptCurrentUser(HttpSession session) {
				long loggedInUserId = (Long)session.getAttribute("loggedInUserId");
		        List<User> users = userDAO.listUsers(loggedInUserId);
		        if(users.isEmpty()){
		            return new ResponseEntity<List<User>>(HttpStatus.NO_CONTENT);//You many decide to return HttpStatus.NOT_FOUND
		        }
		        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
		    }
		
		 //-------------------Retrieve Single User--------------------------------------------------------
	    
		@GetMapping(value="/user/id/{id}",produces=MediaType.APPLICATION_JSON_VALUE)
	    public ResponseEntity<User> getUser(@PathVariable("id") long id) {
	        System.out.println("Fetching User with id " + id);
	        User user = userDAO.getUserByUserId(id);
	        if (user == null) {
	            System.out.println("User with id " + id + " not found");
	            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
	        }
	        return new ResponseEntity<User>(user, HttpStatus.OK);
	    }
		
		@GetMapping(value="/user/username/{username}",produces=MediaType.APPLICATION_JSON_VALUE)
	    public ResponseEntity<User> getUser(@PathVariable("username") String username) {
	        
	        User user = userDAO.getUserByUsername(username);
	        if (user == null) {
	            
	            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
	        }
	        return new ResponseEntity<User>(user, HttpStatus.OK);
	    }
	

		 //-------------------Create a User--------------------------------------------------------
	    
		@PostMapping(value = "/user/")
	    public ResponseEntity<Void> createUser(@RequestBody User user) {
	        System.out.println("Creating User " + user.getUsername());
	  
	        if (userDAO.isExistingUser(user)) {
	            System.out.println("A User with name " + user.getUsername() + " already exist");
	            return new ResponseEntity<Void>(HttpStatus.CONFLICT);
	        }
	  
	        userDAO.addUser(user);
	  
	       
	        return new ResponseEntity<Void>(HttpStatus.CREATED);
	    }
		
		
		 //------------------- Update a User --------------------------------------------------------
	    
		@PutMapping(value = "/user/{id}")
	    public ResponseEntity<User> updateUser(@PathVariable("id") long id, @RequestBody User user) {
	        System.out.println("Updating User " + id);
	          
	        User currentUser = userDAO.getUserByUserId(id);
	          
	        if (currentUser==null) {
	            System.out.println("User with id " + id + " not found");
	            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
	        }
	  
	        currentUser.setFirstName(user.getFirstName());
	        currentUser.setLastName(user.getLastName());
	        currentUser.setUsername(user.getUsername());
	        currentUser.setPassword(user.getPassword());
	        
	        
	          
	        userDAO.updateUser(currentUser);
	        return new ResponseEntity<User>(currentUser, HttpStatus.OK);
	    }
	  
		
		//------------------- Delete a User --------------------------------------------------------
	    @DeleteMapping(value = "/user/{id}")
	    public ResponseEntity<User> deleteUser(@PathVariable("id") long id) {
	        System.out.println("Fetching & Deleting User with id " + id);
	  
	        User user = userDAO.getUserByUserId(id);
	        if (user == null) {
	            System.out.println("Unable to delete. User with id " + id + " not found");
	            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
	        }
	  
	        userDAO.deleteUser(user);
	        return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
	    }
	    
	    
	  //-------------------Authenticate a User--------------------------------------------------------
	    
	  	@PostMapping(value = "/user/authenticate")
	      public ResponseEntity<User> authenticate(@RequestBody User user,HttpSession session) {
	          
	    
	          if (userDAO.authenticate(user.getUsername(),user.getPassword())) {
	        	  friendDAO.setOnline((userDAO.getUserByUsername(user.getUsername()).getUserId()));
	        	  User u=userDAO.getUserByUsername(user.getUsername());
	        	  session.setAttribute("loggedInUser", u);
	        	  session.setAttribute("loggedInUserId", u.getUserId());
	        	  System.out.println("Logged in User ID:"+session.getAttribute("loggedInUserId").toString());
	              return new ResponseEntity<User>(u,HttpStatus.OK);
	          }
	    
	          
	          
	    
	         
	          return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
	      }
		
//-------------------Authenticate a User--------------------------------------------------------
	    
	  	@PutMapping(value = "/user/logout")
	      public ResponseEntity<User> logout(HttpSession session) {
	          
	  		Long userId=(Long)session.getAttribute("loggedInUserId");
	  		
	  		friendDAO.setOffline(userId);
	  		session.invalidate();
	    
	      
	        return new ResponseEntity<User>(HttpStatus.OK);
	      }
}
