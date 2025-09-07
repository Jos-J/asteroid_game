package src;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Rectangle;

public class Projectile {
    private int x, y;
    private int speed;
    private boolean active;

    public Projectile(int x, int y) {
        this.x = x;
        this.y = y;
        this.speed = 12; // pixels per frame
        this.active = true;
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
