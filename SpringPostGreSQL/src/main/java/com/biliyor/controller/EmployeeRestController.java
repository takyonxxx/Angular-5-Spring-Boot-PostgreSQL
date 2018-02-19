package com.biliyor.controller;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.ConditionalOnEnabledResourceChain;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.biliyor.model.Employee;
import com.biliyor.repository.EmployeeRepository;
import com.biliyor.service.EmployeeService;

@RestController
public class EmployeeRestController {
	
	@Autowired
	private EmployeeService employeeService;
	
	@Autowired
	EmployeeRepository employeeRepository;
	
	@RequestMapping("/")
	public ModelAndView index () {
	    ModelAndView modelAndView = new ModelAndView();
	    modelAndView.setViewName("index");
	    return modelAndView;
	}
	
	@RequestMapping(path="/api", method=RequestMethod.GET)
	public List<Employee> getAllEmployees(){
		return employeeService.getAllEmployees();
	}
	
	/*@RequestMapping(value = "/api/employee/{id}", method = RequestMethod.GET)
	public Employee getEmployeeById(@PathVariable("id") long id){		
		System.out.println("Get Employee: " + id);		
		return employeeService.getEmployeeById(id);
	}*/	

	@RequestMapping(value = "/api/employee/{id}", method = RequestMethod.GET)
	public List<Employee> selectEmployeeById(@PathVariable("id") long id){		
		System.out.println("Select Employee: " + id);
		
		Employee emp = employeeService.getEmployeeById(id);
		List<Employee> employees = new ArrayList<Employee>();
		employees.add(emp);
		return employees;
	}
		
	@RequestMapping(path="/api/add", method=RequestMethod.POST, produces="application/json")	
	public @ResponseBody List<Employee> addRecord(@RequestBody Employee employee) {	
		
		System.out.println("Add Employee: " + employee);
		employeeRepository.save(employee);		
		return employeeService.getAllEmployees();
	}
	
	@RequestMapping(path="/api/update", method=RequestMethod.POST, produces="application/json")	
	public @ResponseBody List<Employee> updateRecord(@RequestBody Employee employee) {		 
		
		System.out.println("Update Employee: " + employee);		
		employeeRepository.save(employee);		
	    return employeeService.getAllEmployees();		
	}		
	
	@RequestMapping(path="/api/delete/{id}", method=RequestMethod.POST, produces="application/json")	
	public List<Employee> deleteEmployee(@PathVariable("id") long id){
		System.out.println("Delete Employee: " + id);		
		if(employeeRepository.count() == 0)
		{
			return null;
		}		
		employeeRepository.delete(id);		
		return employeeService.getAllEmployees();
	}	
	
}
