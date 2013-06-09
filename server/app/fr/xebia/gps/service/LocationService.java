package fr.xebia.gps.service;

import org.springframework.stereotype.Service;

import play.db.jpa.JPA;
import fr.xebia.gps.db.entity.LocationDB;

@Service
public class LocationService {

    public LocationDB create(LocationDB location) {
        JPA.em().persist(location);
        return location;
    }

    public LocationDB update(LocationDB location) {
        LocationDB locationToUpdate = getById(location.getId());

        if (locationToUpdate == null) {
            return null;
        }

        locationToUpdate.setAccuracy(location.getAccuracy());
        locationToUpdate.setLatitude(location.getLatitude());
        locationToUpdate.setLongitude(location.getLongitude());
        return locationToUpdate;
    }

    public void delete(Integer id) {
        LocationDB locationToDelete = getById(id);

        if (locationToDelete == null) {
            return;
        }

        JPA.em().remove(locationToDelete);
    }

    public LocationDB getById(Integer id) {
        return JPA.em().getReference(LocationDB.class, id);
    }

}
