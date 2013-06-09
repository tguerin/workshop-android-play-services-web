package controllers.converter;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import controllers.dto.DeviceMsg;
import fr.xebia.gps.db.entity.DeviceDB;

public class DeviceConverter {

    public static DeviceMsg convertToDto(DeviceDB deviceDB) {

        if (deviceDB == null) {
            return null;
        }

        DeviceMsg deviceMsg = new DeviceMsg();
        deviceMsg.setDeviceId(deviceDB.getDeviceId());
        deviceMsg.setId(deviceDB.getId());
        deviceMsg.setLocation(LocationConverter.convertToDto(deviceDB.getLocation()));
        deviceMsg.setRegistrationId(deviceDB.getRegistrationId());
        deviceMsg.setUser(UserConverter.convertToMinDto(deviceDB.getUser()));

        return deviceMsg;
    }

    public static DeviceDB convertToEntity(DeviceMsg deviceMsg) {

        if (deviceMsg == null) {
            return null;
        }
        DeviceDB deviceDB = new DeviceDB();
        deviceDB.setDeviceId(deviceMsg.getDeviceId());
        deviceDB.setId(deviceMsg.getId());
        deviceDB.setLocation(LocationConverter.convertToEntity(deviceMsg.getLocation()));
        deviceDB.setRegistrationId(deviceMsg.getRegistrationId());
        deviceDB.setUser(UserConverter.convertMinToEntity(deviceMsg.getUser()));
        return deviceDB;
    }

    public static List<DeviceMsg> convertToDtoList(Set<DeviceDB> devices) {
        if (devices == null) {
            return null;
        }

        List<DeviceMsg> devicesMsg = new LinkedList<DeviceMsg>();

        for (DeviceDB deviceDB : devices) {
            devicesMsg.add(convertToDto(deviceDB));
        }

        return devicesMsg;
    }

    public static Set<DeviceDB> convertToEntityList(List<DeviceMsg> devices) {
        if (devices == null) {
            return null;
        }

        Set<DeviceDB> devicesDB = new HashSet<DeviceDB>();

        for (DeviceMsg deviceMsg : devices) {
            devicesDB.add(convertToEntity(deviceMsg));
        }

        return devicesDB;
    }

}
