package com.test.naman.schedule;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ScheduleDAO {

	@Autowired
	private SqlSessionTemplate template;
	
	// 지역 목록을 가져온다
	public List<RegionDTO> getRegionList() {
		
		return template.selectList("schedule.getregionlist");
	}

	// 지역에 따른 시군구 목록을 가져온다
	public List<SigunguDTO> getSigunguList(String areaCode) {
		
		return template.selectList("schedule.getsigungulist", areaCode);
	}

	// 여행 기본일정을 추가한다
	public int addBasicPlan(TripPlanDTO dto) {
		
		return template.insert("schedule.addbasicplan", dto);
	}

	// 가장 최신의 여행 기본일정 seq를 가져온다
	public String getLatestSeq(String customerSeq ) {
		
		return template.selectOne("schedule.getlatestseq", customerSeq);
	}

	public int saveScheduleData(PlanDetailDTO dto) {
		
		return template.insert("schedule.savescheduledata", dto);
	}

	public int clearScheduleData(PlanDetailDTO dto) {
		
		return template.delete("schedule.clearscheduledata", dto);
		
	}

	public List<PlanDetailDTO> loadScheduleData(PlanDetailDTO dto) {
		
		return template.selectList("schedule.loadscheduledata", dto);
	}

	public int updateDay(TripPlanDTO dto) {
		
		return template.update("schedule.updateday", dto);
	}

	public TripPlanDTO getTripPlan(String tripPlanSeq) {
		
		return template.selectOne("schedule.gettripplan", tripPlanSeq);
	}

	public int dayDeleteSchedule(PlanDetailDTO dto) {
		
		return template.delete("schedule.daydeleteschedule", dto);
	}

	public List<TripPlanDTO> getTripPlanList(String customerSeq) {
		
		return template.selectList("schedule.gettripplanlist", customerSeq);
	}

	public List<PlanDayCntDTO> getPlanDayCnt(String tripPlanSeq) {
		
		return template.selectList("schedule.getplandaycnt", tripPlanSeq);
	}

	public List<PlanDetailDTO> getPlanDetailList(String tripPlanSeq) {
		
		return template.selectList("schedule.getplandetaillist", tripPlanSeq);
	}

	public int deletePlanDetail(String tripPlanSeq) {
		
		return template.delete("schedule.deleteplandetail", tripPlanSeq);
	}

	public int deleteTripPlan(String tripPlanSeq) {
		
		return template.delete("schedule.deletetripplan", tripPlanSeq);
	}











		
}
