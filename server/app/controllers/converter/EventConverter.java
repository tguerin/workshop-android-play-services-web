package controllers.converter;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import controllers.dto.EventMsg;
import fr.xebia.gps.db.entity.EventDB;

public class EventConverter {

    public static EventMsg convertToDto(EventDB eventDB) {

        if (eventDB == null) {
            return null;
        }

        EventMsg eventMsg = new EventMsg();
        eventMsg.setCreationDate(eventDB.getCreationDate());
        eventMsg.setDescription(eventDB.getDescription());
        eventMsg.setEndDate(eventDB.getEndDate());
        eventMsg.setId(eventDB.getId());
        eventMsg.setLocation(LocationConverter.convertToDto(eventDB.getLocation()));
        eventMsg.setName(eventDB.getName());
        eventMsg.setStartDate(eventDB.getStartDate());

        return eventMsg;
    }

    public static EventDB convertToEntity(EventMsg eventMsg) {

        if (eventMsg == null) {
            return null;
        }
        EventDB eventDB = new EventDB();
        eventDB.setCreationDate(eventMsg.getCreationDate());
        eventDB.setDescription(eventMsg.getDescription());
        eventDB.setEndDate(eventMsg.getEndDate());
        eventDB.setId(eventMsg.getId());
        eventDB.setLocation(LocationConverter.convertToEntity(eventMsg.getLocation()));
        eventDB.setName(eventMsg.getName());
        eventDB.setStartDate(eventMsg.getStartDate());
        return eventDB;
    }

    public static List<EventMsg> convertToDtoList(Set<EventDB> events) {
        if (events == null) {
            return null;
        }

        List<EventMsg> eventsMg = new LinkedList<EventMsg>();

        for (EventDB eventDB : events) {
            eventsMg.add(convertToDto(eventDB));
        }

        return eventsMg;
    }

    public static Set<EventDB> convertToEntityList(List<EventMsg> events) {
        if (events == null) {
            return null;
        }

        Set<EventDB> eventsDB = new HashSet<EventDB>();

        for (EventMsg eventMsg : events) {
            eventsDB.add(convertToEntity(eventMsg));
        }

        return eventsDB;
    }

}
