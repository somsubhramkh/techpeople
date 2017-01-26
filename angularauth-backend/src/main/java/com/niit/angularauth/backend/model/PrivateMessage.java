package com.niit.angularauth.backend.model;

import java.util.Date;

public class PrivateMessage extends Message{
	
	private String friendName;
	private Date time;
	
	public PrivateMessage(Message original, String friendName,Date time) {
        super(original.getId(), original.getMessage(),original.getUsername());
        this.time=time;
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

	public Date getTime() {
		return time;
	}

	public void setTime(Date time) {
		this.time = time;
	}
    
	

}
