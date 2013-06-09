package fr.xebia.gps.service;

import java.util.Date;

import org.springframework.stereotype.Service;

import play.db.jpa.JPA;
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

}
