package controllers.dto;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;

public class UserMsg {

    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    private Date creationDate;
    private List<EventMsg> events = new LinkedList<EventMsg>();
    private List<DeviceMsg> devices = new LinkedList<DeviceMsg>();

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getCreationDate() {
        return this.creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public List<EventMsg> getEvents() {
        return events;
    }

    public void setEvents(List<EventMsg> events) {
        this.events = events;
    }

    public List<DeviceMsg> getDevices() {
        return devices;
    }

    public void setDevices(List<DeviceMsg> devices) {
        this.devices = devices;
    }

}
