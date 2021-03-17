package com.test.naman.schedule;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class ScheduleController {

	@Autowired
	private ScheduleDAO dao;

	// 여행 기본정보 등록
	@RequestMapping(value = "/schedule/addbasic.action", method = { RequestMethod.GET })
	public String addbasic(HttpServletRequest request, HttpServletResponse response, HttpSession session) {

		session.setAttribute("customerseq", "1");

		List<RegionDTO> regionList = dao.getRegionList();

		request.setAttribute("regionList", regionList);

		return "schedule.addbasic";
	}

	// 여행 기본정보 등록
	@RequestMapping(value = "/schedule/addbasicok.action", method = { RequestMethod.POST })
	public void addbasicok(HttpServletRequest request, HttpServletResponse response, HttpSession session,
			TripPlanDTO dto) {

		String customerseq = (String) session.getAttribute("customerseq");

		dto.setCustomerSeq(customerseq);

		System.out.println(dto.getTitle());
		System.out.println(dto.getCustomerSeq());
		System.out.println(dto.getStartDate());
		System.out.println(dto.getEndDate());
		System.out.println(dto.getDescript());
		System.out.println(dto.getTotalDate());
		System.out.println(dto.getRegion());

		int result = dao.addBasicPlan(dto);

		try {
			if (result == 1) {
				response.sendRedirect("/naman/schedule/addschedule.action");
			} else {
				response.sendRedirect("/naman/schedule/addbasic.action");
			}
		} catch (Exception e) {
			System.out.println(e);
		}

	}

	// 여행 상세일정
	@RequestMapping(value = "/schedule/addschedule.action", method = { RequestMethod.GET })
	public String addSchedule(HttpServletRequest request, HttpServletResponse response, HttpSession session) {

		List<RegionDTO> regionList = dao.getRegionList();

		request.setAttribute("regionList", regionList);

		return "addschedule";
	}

}
