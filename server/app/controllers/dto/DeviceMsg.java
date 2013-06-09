package controllers.dto;

public class DeviceMsg {

    private Integer id;
    private UserMinMsg user;
    private LocationMsg location;
    private String deviceId;
    private String registrationId;

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public UserMinMsg getUser() {
        return this.user;
    }

    public void setUser(UserMinMsg user) {
        this.user = user;
    }

    public LocationMsg getLocation() {
        return this.location;
    }

    public void setLocation(LocationMsg location) {
        this.location = location;
    }

    public String getDeviceId() {
        return this.deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public String getRegistrationId() {
        return this.registrationId;
    }

    public void setRegistrationId(String registrationId) {
        this.registrationId = registrationId;
    }

}
