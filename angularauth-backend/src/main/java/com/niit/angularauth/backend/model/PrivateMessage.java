package com.niit.angularauth.backend.model;

import java.util.Date;

public class PrivateMessage extends Message{
	
	private String friendName;
	
	public PrivateMessage(Message original, String friendName) {
        super(original.getId(), original.getMessage(),original.getUsername());
        this.friendName = friendName;
    }

	private PrivateMessage()
	{
		
	}
	public String getFriendName() {
		return friendName;
	}

	public void setFriendName(String friendName) {
		this.friendName = friendName;
	}
    
	

}
