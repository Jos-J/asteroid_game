package src;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Rectangle;

public class Projectile {
    private double x, y;
    private double dx, dy;
    private int speed = 12;
    private boolean active;

    public Projectile(int startX, int startY, int targetX, int targetY) {
        this.x = startX;
        this.y = startY;
        this.active = true;

        double angle = Math.atan2(targetY - startY, targetX - startX);
        dx = speed * Math.cos(angle);
        dy = speed * Math.sin(angle);
    }

    public void update() {
        x += dx;
        y += dy;
        
        // off screen deactivation
        if (x < 0 || x > 800 || y < 0 || y > 600) active = false;
    }

    public void draw(Graphics g) {
        g.setColor(Color.YELLOW);
        g.fillRect((int)x, (int)y, 4, 12); // small rectangle "bullet"
    }

    public Rectangle getBounds() {
        return new Rectangle((int)x, (int)y, 4, 12);
    }

    public boolean isActive() { return active; }
}
