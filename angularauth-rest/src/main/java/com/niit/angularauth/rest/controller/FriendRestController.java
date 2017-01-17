package com.niit.angularauth.rest.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.niit.angularauth.backend.dao.FriendDAO;
import com.niit.angularauth.backend.dao.UserDAO;
import com.niit.angularauth.backend.model.Friend;

@RestController
public class FriendRestController {

	@Autowired
	FriendDAO friendDAO;
	
	@Autowired
	UserDAO userDAO;
	
	@Autowired
	HttpSession session;
	
	
	
	
	@GetMapping(value = "/addFriend/{friendID}")
	public ResponseEntity<Friend> sendFriendRequest(@PathVariable("friendID") long friendID ) {
		
		//long loggedInUserID = (Long) session.getAttribute("loggedInUserID");
		Friend friend=new Friend();
		friend.setUser(userDAO.getUserByUserId(21));
		friend.setFriend(userDAO.getUserByUserId(friendID));
		friend.setStatus("New");
		friend.setOnline(false);
		
		friendDAO.addFriend(friend);
		return new ResponseEntity<Friend>(friend, HttpStatus.OK);

	}
	
	@GetMapping(value = "/myFriends")
	public ResponseEntity<List<Friend>> getMyFriends( ) {
		
		//long loggedInUserID = (Long) session.getAttribute("loggedInUserID");

		
		List<Friend> myFriends = friendDAO.listMyFriends(21);

		if (myFriends.isEmpty()) {
			return new ResponseEntity<List<Friend>>(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<List<Friend>>(myFriends, HttpStatus.OK);
	}
	
	@GetMapping(value = "/acceptFriend/{friendId}")
	public ResponseEntity<Friend> acceptFriendFriendRequest(@PathVariable("friendId") long friendId) {
		//long loggedInUserID = (Long) session.getAttribute("loggedInUserID");
		Friend friend=friendDAO.getFriend(21, friendId);
		friend.setStatus("Accepted");
		friendDAO.updateFriend(friend);

		return new ResponseEntity<Friend>(friend, HttpStatus.OK);

	}
	
	@GetMapping(value = "/rejectFriend/{friendId}")
	public ResponseEntity<Friend> rejectFriendFriendRequest(@PathVariable("friendId") long friendId) {
		//long loggedInUserID = (Long) session.getAttribute("loggedInUserID");
		Friend friend=friendDAO.getFriend(21, friendId);
		friend.setStatus("Rejected");
		friendDAO.updateFriend(friend);

		return new ResponseEntity<Friend>(friend, HttpStatus.OK);

	}
	
	@GetMapping(value = "/getMyFriendRequests/")
	public ResponseEntity<List<Friend>> getMyFriendRequests() {
		
		//Long loggedInUserID = (Long) session.getAttribute("loggedInUserID");
		List<Friend> myFriendRequests = friendDAO.listNewFriendRequests(21);
		return new ResponseEntity<List<Friend>>(myFriendRequests, HttpStatus.OK);

	}
	
	
}
