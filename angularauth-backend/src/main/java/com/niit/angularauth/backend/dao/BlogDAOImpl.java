package com.niit.angularauth.backend.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import com.niit.angularauth.backend.model.Blog;
import com.niit.angularauth.backend.model.User;

@Repository("blogDAO")
@EnableTransactionManagement
@Transactional
public class BlogDAOImpl implements BlogDAO{

	@Autowired
	SessionFactory sessionFactory;
	
	public void addBlog(Blog blog) {
		Session session=sessionFactory.getCurrentSession();
		session.saveOrUpdate(blog);
		
	}

	public void updateBlog(Blog blog) {
		Session session=sessionFactory.getCurrentSession();
		session.saveOrUpdate(blog);
		
	}

	public void deleteBlog(Blog blog) {
		Session session=sessionFactory.getCurrentSession();
		session.delete(blog);
		
	}

	public Blog getBlogByBlogId(long blogId) {
		Session session=sessionFactory.getCurrentSession();
		Blog blog=(Blog)session.createQuery("from Blog where blogId="+blogId).getSingleResult();
		
		return blog;
	}

	public List<Blog> listBlogs() {
		Session session=sessionFactory.getCurrentSession();
		List<Blog> blogs=session.createQuery("from Blog").getResultList();
		
		return blogs;
	}
	
	

}
