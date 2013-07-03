package controllers;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.ConcurrentLinkedQueue;

import org.codehaus.jackson.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;

import play.data.Form;
import play.db.jpa.Transactional;
import play.libs.F.Callback0;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.WebSocket;

import com.google.android.gcm.server.Constants;
import com.google.android.gcm.server.Message;
import com.google.android.gcm.server.Sender;

import controllers.dto.DeviceMsg;
import fr.xebia.gps.db.entity.DeviceDB;
import fr.xebia.gps.service.DeviceService;

@org.springframework.stereotype.Controller
@Transactional
public class Push extends Controller {

    private static final String API_KEY = "AIzaSyDTflmpjet--zAUuvi35D6RhLjId41uGbg";

    private ConcurrentLinkedQueue<WebSocket.Out<String>> wsOut = new ConcurrentLinkedQueue<WebSocket.Out<String>>();

    @Autowired
    private DeviceService deviceService;

    public WebSocket<String> connect() {

        WebSocket<String> ws = new WebSocket<String>() {
            public void onReady(WebSocket.In<String> in, final WebSocket.Out<String> out) {
                wsOut.add(out);
                in.onClose(new Callback0() {
                    public void invoke() {
                        wsOut.remove(out);
                    }
                });
                out.write("connected");
            }
        };
        return ws;
    }

    public Result notifyLocation() {
        Form<DeviceMsg> form = new Form<DeviceMsg>(DeviceMsg.class).bindFromRequest();
        DeviceMsg device = form.get();
        for (WebSocket.Out<String> out : wsOut) {
            out.write(Json.stringify(Json.toJson(device)));
        }
        return ok();
    }

    public Result broadcastMessage() {
        JsonNode request = request().body().asJson();
        if (request == null) {
            return badRequest("Expecting Json data");
        }

        List<DeviceDB> devices = deviceService.findAll();

        for (DeviceDB device : devices) {
            try {
                if (device.getRegistrationId() != null) {
                    sendGcmMessage(device.getId(), device.getRegistrationId(), request.findPath("message").getTextValue());
                }
            } catch (IOException e) {
                return badRequest("An error occured with the communication between our server and Gcm");
            }
        }

        return ok("{\"status\" : \"ok\"}");
    }

    private void sendGcmMessage(Integer deviceId, String gcmId, String broadcastMessage) throws IOException {
        Sender sender = new Sender(API_KEY);
        Message message = new Message.Builder().addData("message", broadcastMessage).timeToLive(60).build();
        com.google.android.gcm.server.Result result = sender.send(message, gcmId, 1);
        System.out.println(result.getErrorCodeName());
        System.out.println(result.getMessageId());

        if (result.getMessageId() != null) {
            String canonicalRegId = result.getCanonicalRegistrationId();
            if (canonicalRegId != null) {
                // same device has more than on registration ID: update
                // database
                deviceService.updateGcmId(deviceId, canonicalRegId);
            }
        } else {
            String error = result.getErrorCodeName();
            if (error.equals(Constants.ERROR_NOT_REGISTERED)) {
                // TODO Flag device as uninstalled
                // application has been removed from device - unregister
                // database
                deviceService.updateGcmId(deviceId, null);
            }
        }
    }

}
