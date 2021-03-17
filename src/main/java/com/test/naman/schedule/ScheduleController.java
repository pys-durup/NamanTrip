package com.test.naman.schedule;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
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

		session.setAttribute("customerseq", "1");

		List<RegionDTO> regionList = dao.getRegionList();

		request.setAttribute("regionList", regionList);

		return "schedule.addbasic";
	}

	// 여행 기본정보 등록 후 상세정보 페이지
	@RequestMapping(value = "/schedule/addbasicok.action", method = { RequestMethod.POST })
	public void addbasicok(HttpServletRequest request, HttpServletResponse response, HttpSession session,
			TripPlanDTO dto) {

		String customerSeq = (String) session.getAttribute("customerseq");

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
		String tripPlanseq = dao.getLatestSeq(customerSeq);
		

		

		try {
			if (result == 1) {
				response.sendRedirect("/naman/schedule/addschedule.action?tripPlanseq="+tripPlanseq+"&startDate="+dto.getStartDate()+"&endDate="+dto.getEndDate()+"&totalDate="+dto.getTotalDate());
			} else {
				response.sendRedirect("/naman/schedule/addbasic.action");
			}
		} catch (Exception e) {
			System.out.println(e);
		}

	}

	// 여행 상세일정
	@RequestMapping(value = "/schedule/addschedule.action", method = { RequestMethod.GET })
	public String addSchedule(HttpServletRequest request, HttpServletResponse response, HttpSession session, String tripPlanseq, String startDate, String endDate, String totalDate) {

		List<RegionDTO> regionList = dao.getRegionList();

		request.setAttribute("regionList", regionList);
		
		request.setAttribute("tripPlanseq", tripPlanseq);
		request.setAttribute("startDate", startDate);
		request.setAttribute("endDate", endDate);
		request.setAttribute("totalDate", totalDate);

		return "addschedule";
	}
	
	// 여행 스케줄 저장
	@RequestMapping(value = "/schedule/savescheduledata.action", method = { RequestMethod.POST })
	public void saveScheduleData(HttpServletRequest request, HttpServletResponse response, HttpSession session, String jsonData, String tripPlanseq, String planDay) {

		System.out.println(jsonData);
		PlanDetailDTO temp = new PlanDetailDTO();
		temp.setPlanDay(planDay);
		temp.setTripPlanSeq(tripPlanseq);

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
			list = (JSONArray)parser.parse(jsonData);
		} catch (Exception e) {
			System.out.println("변환에 실패");
			e.printStackTrace();
		}
		
//		System.out.println(list);
//		System.out.println(list.get(0));
		ArrayList<PlanDetailDTO> itemList = new ArrayList<PlanDetailDTO>(); //저장할 데이터를 담을 리스트변수
		
		
		for (int i=0 ; i < list.size() ; i++) {
			JSONObject obj = (JSONObject)list.get(i);
			PlanDetailDTO dto = new PlanDetailDTO();
			
			//System.out.println(obj.get("img"));
			dto.setAddr1((String)obj.get("addr1"));
			dto.setCat1((String)obj.get("cat1"));
			dto.setContentId((String)obj.get("contentId"));
			dto.setContentTypeId((String)obj.get("contentTypeId"));
			dto.setImg((String)obj.get("img"));
			dto.setMapX((String)obj.get("mapX"));
			dto.setMapY((String)obj.get("mapY"));
			dto.setPlanDay((String)obj.get("planDay"));
			dto.setPlanNo((String)obj.get("planNo"));
			dto.setTitle((String)obj.get("title"));
			dto.setTripPlanSeq((String)obj.get("tripPlanseq"));
			
			
			itemList.add(dto);
		}
		
		
		
		dao.clearScheduleData(temp); // 해당 날의 여행데이터 초기화

		
		for(PlanDetailDTO dto : itemList) {
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
	public void loadScheduleData(HttpServletRequest request, HttpServletResponse response, HttpSession session, String tripPlanseq, String planDay) throws ServletException, IOException {
		
		request.setCharacterEncoding("utf-8");
		response.setContentType("application/json; charset=utf-8");
		
		PlanDetailDTO dto = new PlanDetailDTO();
		dto.setPlanDay(planDay);
		dto.setTripPlanSeq(tripPlanseq);
		
		List<PlanDetailDTO> list = dao.loadScheduleData(dto);
		String item = "[";
		
		for (int i=0 ; i<list.size() ; i++) {
			
			item += "{";
			item += 	"\"title\" : \"" + list.get(i).getTitle() + "\",";
			item += 	"\"addr1\" : \"" + list.get(i).getAddr1() + "\",";
			item += 	"\"img\" : \"" + list.get(i).getImg() + "\",";
			item += 	"\"mapX\" : \"" + list.get(i).getMapX() + "\",";
			item += 	"\"mapY\" : \"" + list.get(i).getMapY() + "\",";
			item += 	"\"contentId\" : \"" + list.get(i).getContentId() + "\",";
			item += 	"\"contentTypeId\" : \"" + list.get(i).getContentTypeId() + "\",";
			item += 	"\"planDay\" : \"" + list.get(i).getPlanDay() + "\",";
			item += 	"\"index\" : \"" + list.get(i).getPlanNo() + "\",";
			item += 	"\"cat1\" : \"" + list.get(i).getCat1() +"\"";
			item += "},";
			
			
		}
		
		item = item.substring(0, item.length()-1);
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
}























