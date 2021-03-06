package fr.xebia.gps.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import play.db.jpa.JPA;
import fr.xebia.gps.db.entity.EventDB;
import fr.xebia.gps.db.entity.UserDB;

@Service
public class EventService {

    @Autowired
    private LocationService locationService;

    public EventDB create(EventDB event) {
        event.setCreationDate(new Date());
        event.setLocation(locationService.create(event.getLocation()));
        JPA.em().persist(event);
        return event;
    }

    public EventDB update(EventDB event) {
        EventDB eventToUpdate = getById(event.getId());

        if (eventToUpdate == null) {
            return null;
        }

        eventToUpdate.setDescription(event.getDescription());
        eventToUpdate.setName(event.getName());
        eventToUpdate.setEndDate(event.getEndDate());
        eventToUpdate.setStartDate(event.getStartDate());
        eventToUpdate.setLocation(locationService.update(event.getLocation()));

        return eventToUpdate;
    }

    public void delete(Integer id) {
        EventDB eventToDelete = getById(id);

        if (eventToDelete == null) {
            return;
        }

        JPA.em().remove(eventToDelete);
    }

    public EventDB getById(Integer id) {
        return JPA.em().getReference(EventDB.class, id);
    }

    public void subscribe(Integer eventId, Integer userId) {
        EventDB event = JPA.em().getReference(EventDB.class, eventId);
        if (event == null) {
            return;
        }

        UserDB user = JPA.em().getReference(UserDB.class, eventId);
        if (user == null) {
            return;
        }
        user.getEvents().add(event);
    }

    public void unsubscribe(Integer eventId, Integer userId) {
        EventDB event = JPA.em().getReference(EventDB.class, eventId);
        if (event == null) {
            return;
        }

        UserDB user = JPA.em().getReference(UserDB.class, eventId);
        if (user == null) {
            return;
        }
        user.getEvents().remove(event);
    }

}
