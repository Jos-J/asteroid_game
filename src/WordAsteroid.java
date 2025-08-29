package src;

import java.awt.*;

public class WordAsteroid {
    private String word;
    private int x, y;
    private int speed;

    public WordAsteroid(String word, int x, int y, int speed) {
        this.word = word;
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    // word position ( falling down)
    public void update() {
        y += speed;
    }

    // word drawn on screen

    public void draw(Graphics g) {
        g.setColor(Color.WHITE);
        g.setFont(new Font("Arial", Font.BOLD, 24));
        g.drawString(word, x, y);
    }

    // check if word has fallen off screen
    public boolean isOffScreen(int panelHeight) {
        return y > panelHeight;
    }

    // Getters
    public String getWord() {
        return word;
    }

    public int getX() { return x; }
    public int getY() { return y; }
}