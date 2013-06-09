package controllers.converter;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import controllers.dto.LocationMsg;
import fr.xebia.gps.db.entity.LocationDB;

public class LocationConverter {

    public static LocationMsg convertToDto(LocationDB locationDB) {

        if (locationDB == null) {
            return null;
        }

        LocationMsg locationMsg = new LocationMsg();
        locationMsg.setAccuracy(locationDB.getAccuracy());
        locationMsg.setId(locationDB.getId());
        locationMsg.setLatitude(locationDB.getLatitude());
        locationMsg.setLongitude(locationDB.getLongitude());

        return locationMsg;
    }

    public static LocationDB convertToEntity(LocationMsg locationMsg) {

        if (locationMsg == null) {
            return null;
        }
        LocationDB locationDB = new LocationDB();
        locationDB.setAccuracy(locationMsg.getAccuracy());
        locationDB.setId(locationMsg.getId());
        locationDB.setLatitude(locationMsg.getLatitude());
        locationDB.setLongitude(locationMsg.getLongitude());

        return locationDB;
    }

    public static List<LocationMsg> convertToDtoList(Set<LocationDB> locations) {
        if (locations == null) {
            return null;
        }

        List<LocationMsg> locationsMg = new LinkedList<LocationMsg>();

        for (LocationDB locationDB : locations) {
            locationsMg.add(convertToDto(locationDB));
        }

        return locationsMg;
    }

    public static Set<LocationDB> convertToEntityList(List<LocationMsg> locations) {
        if (locations == null) {
            return null;
        }

        Set<LocationDB> locationsDB = new HashSet<LocationDB>();

        for (LocationMsg locationMsg : locations) {
            locationsDB.add(convertToEntity(locationMsg));
        }

        return locationsDB;
    }

}
