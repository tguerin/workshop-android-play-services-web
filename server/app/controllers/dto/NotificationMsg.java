package controllers.dto;

public class NotificationMsg {

    private LocationMsg location;
    private Integer deviceId;
    private String urlUserPic;
    private String status;
    private Integer statusConfidence;

    public LocationMsg getLocation() {
        return location;
    }

    public void setLocation(LocationMsg location) {
        this.location = location;
    }

    public Integer getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(Integer deviceId) {
        this.deviceId = deviceId;
    }

    public String getUrlUserPic() {
        return urlUserPic;
    }

    public void setUrlUserPic(String urlUserPic) {
        this.urlUserPic = urlUserPic;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getStatusConfidence() {
        return statusConfidence;
    }

    public void setStatusConfidence(Integer statusConfidence) {
        this.statusConfidence = statusConfidence;
    }

}
