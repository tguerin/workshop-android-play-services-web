import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import play.Application;
import play.GlobalSettings;

public class Global extends GlobalSettings {

    private ApplicationContext ctx;

    @Override
    public void onStart(Application app) {
        ctx = new ClassPathXmlApplicationContext("components.xml");
    }

    @Override
    public <A> A getControllerInstance(Class<A> clazz) {

        // TODO Fix hack le sample spring de guillaume bort ne gère pas le cas
        // de la gestion de transaction fourni par Play via l'annotation
        // @Transactional ! => faire porter la
        // gestion de transaction par Spring
        if ("play.db.jpa.TransactionalAction".equals(clazz.getCanonicalName())) {
            return null;
        }

        return ctx.getBean(clazz);
    }
}