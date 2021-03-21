package com.test.naman.schedule;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
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

		List<RegionDTO> regionList = dao.getRegionList();

		request.setAttribute("regionList", regionList);

		return "schedule.addbasic";
	}

	// 여행 기본정보 등록 후 상세정보 페이지
	@RequestMapping(value = "/schedule/addbasicok.action", method = { RequestMethod.POST })
	public void addbasicok(HttpServletRequest request, HttpServletResponse response, HttpSession session,
			TripPlanDTO dto) {

		String customerSeq = (String) session.getAttribute("customerSeq");

		dto.setCustomerSeq(customerSeq);

		System.out.println(dto.getTitle());
		System.out.println(dto.getCustomerSeq());
		System.out.println(dto.getStartDate());
		System.out.println(dto.getEndDate());
		System.out.println(dto.getDescript());
		System.out.println(dto.getTotalDate());
		System.out.println(dto.getRegion());

		int result = dao.addBasicPlan(dto); // 기본여행정보 DB저장 작업

		// 방금 만든 여행의 seq(식별자)를 가져와야 한다.
		String tripPlanSeq = dao.getLatestSeq(customerSeq);

		try {
			if (result == 1) {
				response.sendRedirect("/naman/schedule/addschedule.action?tripPlanSeq=" + tripPlanSeq);
			} else {
				response.sendRedirect("/naman/schedule/addbasic.action");
			}
		} catch (Exception e) {
			System.out.println(e);
		}

	}

	// 여행 상세일정
	@RequestMapping(value = "/schedule/addschedule.action", method = { RequestMethod.GET })
	public String addSchedule(HttpServletRequest request, HttpServletResponse response, HttpSession session,
			String tripPlanSeq) {

		List<RegionDTO> regionList = dao.getRegionList();
		TripPlanDTO dto = dao.getTripPlan(tripPlanSeq);

		request.setAttribute("regionList", regionList);

		request.setAttribute("tripPlanSeq", tripPlanSeq);
		request.setAttribute("startDate", dto.getStartDate());
		request.setAttribute("endDate", dto.getEndDate());
		request.setAttribute("totalDate", dto.getTotalDate());
		request.setAttribute("title", dto.getTitle());

		return "addschedule";
	}

	// 여행 스케줄 저장
	@RequestMapping(value = "/schedule/savescheduledata.action", method = { RequestMethod.POST })
	public void saveScheduleData(HttpServletRequest request, HttpServletResponse response, HttpSession session,
			String jsonData, String tripPlanSeq, String planDay) {

		System.out.println(jsonData);
		PlanDetailDTO temp = new PlanDetailDTO();
		temp.setPlanDay(planDay);
		temp.setTripPlanSeq(tripPlanSeq);

		if (jsonData.equals("]")) {
			System.out.println("데이터 있을때");
			dao.clearScheduleData(temp); // 해당 날의 여행데이터 초기화
			return;
		} else {
			System.out.println("데이터 없을때");
		}

		JSONParser parser = new JSONParser();
		JSONArray list = null;

		try {
			list = (JSONArray) parser.parse(jsonData);
		} catch (Exception e) {
			System.out.println("변환에 실패");
			e.printStackTrace();
		}

//		System.out.println(list);
//		System.out.println(list.get(0));
		ArrayList<PlanDetailDTO> itemList = new ArrayList<PlanDetailDTO>(); // 저장할 데이터를 담을 리스트변수

		for (int i = 0; i < list.size(); i++) {
			JSONObject obj = (JSONObject) list.get(i);
			PlanDetailDTO dto = new PlanDetailDTO();

			// System.out.println(obj.get("img"));
			dto.setAddr1((String) obj.get("addr1"));
			dto.setCat1((String) obj.get("cat1"));
			dto.setContentId((String) obj.get("contentId"));
			dto.setContentTypeId((String) obj.get("contentTypeId"));
			dto.setImg((String) obj.get("img"));
			dto.setMapX((String) obj.get("mapX"));
			dto.setMapY((String) obj.get("mapY"));
			dto.setPlanDay((String) obj.get("planDay"));
			dto.setPlanNo((String) obj.get("planNo"));
			dto.setTitle((String) obj.get("title"));
			dto.setTripPlanSeq((String) obj.get("tripPlanSeq"));

			itemList.add(dto);
		}

		dao.clearScheduleData(temp); // 해당 날의 여행데이터 초기화

		for (PlanDetailDTO dto : itemList) {
			dao.saveScheduleData(dto); // 여행 데이터 추가
		}

		try {
			PrintWriter out = response.getWriter();
			out.println("성공");
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	// 여행 스케줄 불러오기
	@RequestMapping(value = "/schedule/loadscheduledata.action", method = { RequestMethod.POST })
	public void loadScheduleData(HttpServletRequest request, HttpServletResponse response, HttpSession session,
			String tripPlanSeq, String planDay) throws ServletException, IOException {

		request.setCharacterEncoding("utf-8");
		response.setContentType("application/json; charset=utf-8");

		PlanDetailDTO dto = new PlanDetailDTO();
		dto.setPlanDay(planDay);
		dto.setTripPlanSeq(tripPlanSeq);

		List<PlanDetailDTO> list = dao.loadScheduleData(dto);
		String item = "[";

		for (int i = 0; i < list.size(); i++) {

			item += "{";
			item += "\"title\" : \"" + list.get(i).getTitle() + "\",";
			item += "\"addr1\" : \"" + list.get(i).getAddr1() + "\",";
			item += "\"img\" : \"" + list.get(i).getImg() + "\",";
			item += "\"mapX\" : \"" + list.get(i).getMapX() + "\",";
			item += "\"mapY\" : \"" + list.get(i).getMapY() + "\",";
			item += "\"contentId\" : \"" + list.get(i).getContentId() + "\",";
			item += "\"contentTypeId\" : \"" + list.get(i).getContentTypeId() + "\",";
			item += "\"planDay\" : \"" + list.get(i).getPlanDay() + "\",";
			item += "\"index\" : \"" + list.get(i).getPlanNo() + "\",";
			item += "\"cat1\" : \"" + list.get(i).getCat1() + "\"";
			item += "},";

		}

		item = item.substring(0, item.length() - 1);
		item += "]";

		if (item.equals("]")) {
			item = "{\"result\" : \"0\"}";
		}

		System.out.println(item);
		try {
			PrintWriter out = response.getWriter();
			out.println(item);
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	// 여행 day 추가
	@RequestMapping(value = "/schedule/increaseday.action", method = { RequestMethod.GET })
	public void increaseDay(HttpServletRequest request, HttpServletResponse response, HttpSession session,
			TripPlanDTO dto) {

		System.out.println(dto.getTripPlanSeq());
		System.out.println(dto.getTotalDate());
		System.out.println(dto.getEndDate());

		// DB처리
		// 여행 종료날짜 총여행일수 UPDATE
		int result = dao.updateDay(dto);

		try {
			PrintWriter out = response.getWriter();
			out.println(result);
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// 여행 day 삭제
	@RequestMapping(value = "/schedule/decreaseday.action", method = { RequestMethod.GET })
	public void decreaseDay(HttpServletRequest request, HttpServletResponse response, HttpSession session,
			TripPlanDTO tdto, String planDay) {

		System.out.println(tdto.getTripPlanSeq());
		System.out.println(tdto.getTotalDate());
		System.out.println(tdto.getEndDate());
		String tripPlanSeq = tdto.getTripPlanSeq();

		// DB처리
		// 여행 종료날짜 총여행일수 UPDATE
		int result = dao.updateDay(tdto);

		// 삭제된 DAY에 남아있던 여행정보가 있다면 DELETE - tripPlanSeq, planDay 필요
		PlanDetailDTO ddto = new PlanDetailDTO();
		ddto.setTripPlanSeq(tripPlanSeq);
		planDay = String.valueOf(Integer.parseInt(planDay) + 1);
		ddto.setPlanDay(planDay);

		result += dao.clearScheduleData(ddto);

		try {
			PrintWriter out = response.getWriter();
			out.println(result);
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// 여행일정 메인페이지
	@RequestMapping(value = "/schedule/schedule.action", method = { RequestMethod.GET })
	public String schedule(HttpServletRequest request, HttpServletResponse response, HttpSession session) {

		session.setAttribute("customerSeq", "1");
		session.setAttribute("name", "test");

		return "schedule.schedule";
	}

	// 일정 마이페이지
	@RequestMapping(value = "/schedule/myschedule.action", method = { RequestMethod.GET })
	public String myschedule(HttpServletRequest request, HttpServletResponse response, HttpSession session) {

		//session 데이터 가져오기
		String customerSeq = (String) session.getAttribute("customerSeq");
		String name = (String) session.getAttribute("name");

		// DB 작업 -> 내가만든 여행일정 목록을 불러온다
		List<TripPlanDTO> tripPlanList = dao.getTripPlanList(customerSeq);
		
		request.setAttribute("tripPlanList", tripPlanList);
		request.setAttribute("name", name);

		return "schedule.myschedule";
	}

	// 여행일정 상세페이지
	@RequestMapping(value = "/schedule/scheduledetail.action", method = { RequestMethod.GET })
	public String scheduledetail(HttpServletRequest request, HttpServletResponse response, HttpSession session, String tripPlanSeq, String pic) {

		//session 데이터 가져오기
		String name = (String) session.getAttribute("name");
		
		//tripPlanSeq=2& pic=8
		// DB 작업 -> tripPlnaSeq로 여행일정 정보 가져오기
		TripPlanDTO tripPlanDto = dao.getTripPlan(tripPlanSeq);
		
		// DB 작업 -> planDay 여행 일차별로 몇개의 장소에 갔는지 알 수 있도록 가져온다
		List<PlanDayCntDTO> planDayList = dao.getPlanDayCnt(tripPlanSeq);
		
		// DB 작업 -> tripPlnaSeq로 여행일정에 추가한 모든 상세정보 가져오기
		List<PlanDetailDTO> planDetailList = dao.getPlanDetailList(tripPlanSeq);
		
		request.setAttribute("pic", pic);
		request.setAttribute("tripPlanDto", tripPlanDto);
		request.setAttribute("planDayList", planDayList);
		request.setAttribute("planDetailList", planDetailList);		
		request.setAttribute("name", name);
		
		return "schedule.scheduledetail";
	}

	// 여행일정 추가 완료 addscheduleok
	@RequestMapping(value = "/schedule/addscheduleok.action", method = { RequestMethod.GET })
	public void addscheduleok(HttpServletRequest request, HttpServletResponse response, HttpSession session) {

		// DB 작업 -> tblTripPlan 테이블의 complete 값 1로 변경(작성완료 여부)

		int result = 1;

		try {
			if (result == 1) {
				response.sendRedirect("/naman/schedule/schedule.action");
			} else {
				PrintWriter out = response.getWriter();
				out.println("<script>alert('failed');");
				out.println("location.href='/naman/schedule/schedule.action';");
				out.println("</script>");
				out.close();

			}
		} catch (Exception e) {
			System.out.println(e);
		}
	}
	
	
	// 여행일정 추가 완료 delscheduleok.action
	@RequestMapping(value = "/schedule/delscheduleok.action", method = { RequestMethod.GET })
	public void delscheduleok(HttpServletRequest request, HttpServletResponse response, HttpSession session, String tripPlanSeq ) {

		// DB 작업 -> tblTripPlan 여행 일정 삭제
		// tblPlanDetail 여행 상세일정 삭제
		
		int result1;
		int result2;
		
		result1 = dao.deletePlanDetail(tripPlanSeq);
		result2 = dao.deleteTripPlan(tripPlanSeq);

		

		try {
			if (result1 > 0 && result2 > 0) {
				PrintWriter out = response.getWriter();
				out.println("<script>");
				out.println("location.href='/naman/schedule/myschedule.action';");
				out.println("</script>");
				out.close();
			} else {
				PrintWriter out = response.getWriter();
				out.println("<script>");
				out.println("location.href='/naman/schedule/myschedule.action';");
				out.println("</script>");
				out.close();
			}
		} catch (Exception e) {
			System.out.println(e);
		}
	}
}
