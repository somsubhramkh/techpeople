package com.niit.angularauth.backend.dao;

import java.util.List;

import com.niit.angularauth.backend.model.Job;
import com.niit.angularauth.backend.model.JobApplication;

public interface JobDAO {
	
	public void addJob(Job job);
	public void updateJob(Job job);
	public Job getJobById(long jobId);
	public List<Job> listJobs();
	
	public void saveJobApplication(JobApplication jobApplication);
	

}
