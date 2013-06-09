package controllers.converter;

import java.util.LinkedList;
import java.util.List;

import controllers.dto.UserMinMsg;
import controllers.dto.UserMsg;
import fr.xebia.gps.db.entity.UserDB;

public class UserConverter {

    public static UserMsg convertToDto(UserDB userDB) {

        if (userDB == null) {
            return null;
        }

        UserMsg userMsg = new UserMsg();
        userMsg.setCreationDate(userDB.getCreationDate());
        userMsg.setDevices(DeviceConverter.convertToDtoList(userDB.getDevices()));
        userMsg.setEmail(userDB.getEmail());
        userMsg.setEvents(EventConverter.convertToDtoList(userDB.getEvents()));
        userMsg.setFirstName(userDB.getFirstName());
        userMsg.setId(userDB.getId());
        userMsg.setLastName(userDB.getLastName());

        return userMsg;
    }

    public static UserMinMsg convertToMinDto(UserDB userDB) {

        if (userDB == null) {
            return null;
        }

        UserMinMsg userMsg = new UserMinMsg();
        userMsg.setEmail(userDB.getEmail());
        userMsg.setFirstName(userDB.getFirstName());
        userMsg.setId(userDB.getId());
        userMsg.setLastName(userDB.getLastName());

        return userMsg;
    }

    public static UserDB convertMinToEntity(UserMinMsg userMsg) {

        if (userMsg == null) {
            return null;
        }

        UserDB userDB = new UserDB();
        userDB.setEmail(userMsg.getEmail());
        userDB.setFirstName(userMsg.getFirstName());
        userDB.setId(userMsg.getId());
        userDB.setLastName(userMsg.getLastName());

        return userDB;
    }

    public static UserDB convertToEntity(UserMsg userMsg) {

        if (userMsg == null) {
            return null;
        }
        UserDB userDB = new UserDB();
        userDB.setCreationDate(userMsg.getCreationDate());
        userDB.setDevices(DeviceConverter.convertToEntityList(userMsg.getDevices()));
        userDB.setEmail(userMsg.getEmail());
        userDB.setEvents(EventConverter.convertToEntityList(userMsg.getEvents()));
        userDB.setFirstName(userMsg.getFirstName());
        userDB.setId(userMsg.getId());
        userDB.setLastName(userMsg.getLastName());
        return userDB;
    }

    public static List<UserMsg> convertToDtoList(List<UserDB> users) {
        if (users == null) {
            return null;
        }

        List<UserMsg> usersMg = new LinkedList<UserMsg>();

        for (UserDB userDB : users) {
            usersMg.add(convertToDto(userDB));
        }

        return usersMg;
    }

    public static List<UserDB> convertToEntityList(List<UserMsg> users) {
        if (users == null) {
            return null;
        }

        List<UserDB> userDB = new LinkedList<UserDB>();

        for (UserMsg userMsg : users) {
            userDB.add(convertToEntity(userMsg));
        }

        return userDB;
    }

}
