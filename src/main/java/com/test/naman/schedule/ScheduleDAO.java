package com.test.naman.schedule;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ScheduleDAO {

	@Autowired
	private SqlSessionTemplate template;
	
	public List<RegionDTO> getRegionList() {
		
		return template.selectList("schedule.getregionlist");
	}

	public List<SigunguDTO> getSigunguList(String areaCode) {
		
		return template.selectList("schedule.getsigungulist", areaCode);
	}

	public int addBasicPlan(TripPlanDTO dto) {
		
		return template.insert("schedule.addbasicplan", dto);
	}

		
}
