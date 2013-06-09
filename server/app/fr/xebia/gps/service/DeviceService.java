package fr.xebia.gps.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import play.db.jpa.JPA;
import fr.xebia.gps.db.entity.DeviceDB;
import fr.xebia.gps.db.entity.LocationDB;
import fr.xebia.gps.db.entity.UserDB;

@Service
public class DeviceService {

    @Autowired
    private LocationService locationService;

    @Autowired
    private UserService userService;

    public DeviceDB create(DeviceDB device) {
        if (device.getLocation() != null) {
            device.setLocation(locationService.create(device.getLocation()));
        }

        if (device.getUser() == null) {
            throw new IllegalStateException("the user is mandatory");
        }

        UserDB user = userService.getById(device.getUser().getId());

        if (user == null) {
            throw new IllegalStateException("the user with the id " + device.getUser().getId() + " doesn't exist");
        }

        device.setUser(user);

        JPA.em().persist(device);
        return device;
    }

    public DeviceDB update(DeviceDB device) {
        DeviceDB deviceToUpdate = getById(device.getId());

        if (deviceToUpdate == null) {
            return null;
        }

        if (device.getRegistrationId() != null) {
            deviceToUpdate.setRegistrationId(device.getRegistrationId());
        }

        if (device.getLocation() != null) {
            LocationDB location = device.getLocation();
            LocationDB locationtoUpdate = deviceToUpdate.getLocation();

            locationtoUpdate.setAccuracy(location.getAccuracy());
            locationtoUpdate.setLongitude(location.getLongitude());
            locationtoUpdate.setLatitude(location.getLatitude());
            deviceToUpdate.setLocation(locationtoUpdate);
        }

        return deviceToUpdate;
    }

    public void delete(Integer id) {
        DeviceDB deviceToDelete = getById(id);

        if (deviceToDelete == null) {
            return;
        }

        JPA.em().remove(deviceToDelete);
    }

    public DeviceDB getById(Integer id) {
        return JPA.em().getReference(DeviceDB.class, id);
    }

}
