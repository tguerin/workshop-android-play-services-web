package fr.xebia.gps.db.entity;

import static javax.persistence.GenerationType.IDENTITY;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "user", catalog = "google_play_services")
public class UserDB {

    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    private Date creationDate;
    private Set<EventDB> events = new HashSet<EventDB>(0);
    private Set<DeviceDB> devices = new HashSet<DeviceDB>(0);

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Column(name = "firstName", length = 45)
    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @Column(name = "lastName", length = 45)
    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Column(name = "email", length = 45)
    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "creationDate", nullable = false, length = 19)
    public Date getCreationDate() {
        return this.creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "event_has_user", catalog = "google_play_services", joinColumns = { @JoinColumn(name = "User_id", nullable = false, updatable = false) }, inverseJoinColumns = { @JoinColumn(name = "Event_id", nullable = false, updatable = false) })
    public Set<EventDB> getEvents() {
        return this.events;
    }

    public void setEvents(Set<EventDB> events) {
        this.events = events;
    }

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
    public Set<DeviceDB> getDevices() {
        return this.devices;
    }

    public void setDevices(Set<DeviceDB> devices) {
        this.devices = devices;
    }

}
