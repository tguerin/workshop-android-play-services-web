package fr.xebia.gps.service;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;

import javax.persistence.Query;

import org.springframework.stereotype.Service;

import play.db.jpa.JPA;
import fr.xebia.gps.db.entity.EventDB;
import fr.xebia.gps.db.entity.UserDB;

@Service
public class UserService {

    public UserDB create(UserDB user) {
        user.setCreationDate(new Date());
        user.setDevices(null);
        user.setEvents(null);
        JPA.em().persist(user);
        return user;
    }

    public UserDB update(UserDB user) {
        UserDB userToUpdate = getById(user.getId());

        if (userToUpdate == null) {
            return null;
        }

        userToUpdate.setFirstName(user.getFirstName());
        userToUpdate.setLastName(user.getLastName());
        userToUpdate.setEmail(user.getEmail());
        return userToUpdate;
    }

    public void delete(Integer id) {
        UserDB userToDelete = getById(id);

        if (userToDelete == null) {
            return;
        }

        JPA.em().remove(userToDelete);
    }

    public UserDB getById(Integer id) {
        return JPA.em().getReference(UserDB.class, id);
    }

    @SuppressWarnings("unchecked")
    public List<UserDB> findUsersPresentAtAnEvent(Integer eventId) {
        EventDB event = JPA.em().getReference(EventDB.class, eventId);
        List<UserDB> users = new LinkedList<UserDB>();
        if (event != null) {
            StringBuilder query = new StringBuilder();
            query.append("SELECT `user`.*, ((ACOS(SIN(" + event.getLocation().getLatitude() + " * PI() / 180) * SIN(latitude * PI() / 180) + COS("
                    + event.getLocation().getLatitude() + " * PI() / 180) * COS(latitude * PI() / 180) * COS((" + event.getLocation().getLongitude()
                    + " - longitude) * PI() / 180)) * 180 / PI()) * 60 * 1.1515) AS `distance` ");
            query.append("FROM `google_play_services`.`location`, `google_play_services`.`device`, `google_play_services`.`user`, `google_play_services`.`event_has_user` ");
            query.append("WHERE device.Location_id = location.id ");
            query.append("AND device.User_id = user.id ");
            query.append("AND event_has_user.User_id = user.id ");
            query.append("AND event_has_user.Event_id = " + eventId + " ");
            query.append("HAVING `distance`<= 10 ");
            query.append("ORDER BY `distance` ASC ");

            Query nativeQuery = JPA.em().createNativeQuery(query.toString());
            List<Object[]> results = nativeQuery.getResultList();

            for (Object[] data : results) {
                UserDB user = new UserDB();
                user.setId((Integer) data[0]);
                user.setFirstName((String) data[1]);
                user.setLastName((String) data[2]);
                user.setEmail((String) data[3]);
                user.setCreationDate((Date) data[4]);
                users.add(user);
            }
        }

        return users;
    }
}
