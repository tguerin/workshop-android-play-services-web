package controllers;

import java.util.concurrent.ConcurrentLinkedQueue;

import play.data.Form;
import play.libs.F.Callback0;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.WebSocket;
import controllers.dto.DeviceMsg;

public class Push extends Controller {

    private static ConcurrentLinkedQueue<WebSocket.Out<String>> wsOut = new ConcurrentLinkedQueue<WebSocket.Out<String>>();

    public static WebSocket<String> connect() {

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

    public static Result notifyLocation() {
        Form<DeviceMsg> form = new Form<DeviceMsg>(DeviceMsg.class).bindFromRequest();
        DeviceMsg device = form.get();
        for (WebSocket.Out<String> out : wsOut) {
            out.write(Json.stringify(Json.toJson(device)));
        }
        return ok();
    }
}
