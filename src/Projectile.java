package src;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Rectangle;

public class Projectile {
    private int x, y;
    private int speed;
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
        y -= speed;
        if (y < 0) active = false;
    }

    public void draw(Graphics g) {
        g.setColor(Color.YELLOW);
        g.fillRect(x, y, 4, 12); // small rectangle "bullet"
    }

    public Rectangle getBounds() {
        return new Rectangle(x, y, 4, 12);
    }

    public boolean isActive() { return active; }
}
