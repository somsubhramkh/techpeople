package com.niit.angularauth.backend.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import com.niit.angularauth.backend.model.Job;


@Repository("jobDAO")
@EnableTransactionManagement
@Transactional
public class JobDAOImpl implements JobDAO{

	@Autowired
	SessionFactory sessionFactory;
	
	public void addJob(Job job) {
		Session session=sessionFactory.getCurrentSession();
		session.saveOrUpdate(job);
		
	}

	public void updateJob(Job job) {
		Session session=sessionFactory.getCurrentSession();
		session.saveOrUpdate(job);
		
	}
	

	public Job getJobById(long jobId) {
		Session session=sessionFactory.getCurrentSession();
		Job job=(Job)session.createQuery("from Job where jobId="+jobId).getSingleResult();
		return job;
	}

	public List<Job> listJobs() {
		Session session=sessionFactory.getCurrentSession();
		List<Job> jobs=session.createQuery("from Job").getResultList();
		return jobs;
	}
	
	

}
