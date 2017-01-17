package com.niit.angularauth.backend.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import com.niit.angularauth.backend.model.Friend;
import com.niit.angularauth.backend.model.User;

@Repository("friendDAO")
@EnableTransactionManagement
@Transactional
public class FriendDAOImpl implements FriendDAO{

	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	UserDAO userDAO;
	
	public void addFriend(Friend friend) {
		Session session=sessionFactory.getCurrentSession();
		session.saveOrUpdate(friend);
		
	}

	public void updateFriend(Friend friend) {
		Session session=sessionFactory.getCurrentSession();
		session.saveOrUpdate(friend);
		
	}

	public void deleteFriend(long id) {
		Session session=sessionFactory.getCurrentSession();
		Friend friend=(Friend)session.createQuery("from Friend where id="+id).getSingleResult();
		session.delete(friend);
		
	}

	public Friend getFriend(long userId, long friendId) {
		Session session=sessionFactory.getCurrentSession();
		
		User user=userDAO.getUserByUserId(userId);
		User friendUser=userDAO.getUserByUserId(friendId);
		Friend friend=(Friend)session.createQuery("from Friend where userId="+user.getUserId()+" and friendId="+friendUser.getUserId()).getSingleResult();
		return friend;
	}

	public List<Friend> listMyFriends(long userId) {
		Session session=sessionFactory.getCurrentSession();
		User user=userDAO.getUserByUserId(userId);
		List<Friend> friends=session.createQuery("from Friend where userId="+userId).getResultList();
		return friends;
	}

	public List<Friend> listNewFriendRequests(long userId) {
		Session session=sessionFactory.getCurrentSession();
		User user=userDAO.getUserByUserId(userId);
		List<Friend> friends=session.createQuery("from Friend where userId="+userId+" and status='New'").getResultList();
		return friends;
	}

	public void setOnline(String userId) {
		// TODO Auto-generated method stub
		
	}

	public void setOffline(String userId) {
		// TODO Auto-generated method stub
		
	}
	
	

}
