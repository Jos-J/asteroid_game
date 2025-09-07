package src;

import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import java.util.Random;
import javax.sound.sampled.*;
import java.io.File;
import java.io.IOException;

public class GamePanel extends JPanel implements Runnable {
    
    // Game thread
    private Thread gameThread;
    private boolean running = false;

    // Frame rate
    private final int FPS = 60;
    private int FRAME_TIME = 1000 / FPS;

    //
    private Image background;

    // word manaager
    private  WordManager wordManager;

    // input hanhandler
    private InputHandler inputHandler;

    // list to hold projectiles
    private java.util.List<Projectile> projectiles = new java.util.ArrayList<>();

    

    public GamePanel() {
        setPreferredSize(new Dimension(800, 600)); // window size
        setFocusable(true);
        requestFocus();


        // Init managers
        inputHandler = new InputHandler();
        addKeyListener(inputHandler);

        wordManager = new WordManager();

        // Load background image
        background = new ImageIcon("./assets/background_stars.jpg").getImage();

        
    }

    // start of game loop
    public void startGame() {
        if(gameThread == null || !running) {
            running = true;
            gameThread = new Thread(this);
            gameThread.start();
        }
    }

    @Override 
    public void run(){
        while (running) {
            long startTime = System.currentTimeMillis();

            update();   // update game logic
            repaint();  // render

            long endTime = System.currentTimeMillis();
            long sleepTime = FRAME_TIME - (endTime - startTime);

            if (sleepTime > 0) {
                try {
                    Thread.sleep(sleepTime);
                 } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }

   private void update() {
    // Update falling words
    wordManager.update(getWidth(), getHeight());

    // Update projectiles
    for (int i = 0; i < projectiles.size(); i++) {
        Projectile p = projectiles.get(i);
        p.update();
        if (!p.isActive()) {
            projectiles.remove(i);
            i--; // adjust index after removal
        }
    }

    // Check typed word
    if (inputHandler.isEnterPressed()) {
        String typedWord = inputHandler.getCurrentInput();

        // Return the asteroid object that matches typed word
        WordAsteroid destroyedAsteroid = wordManager.checkAndDestroyTypedWord(typedWord);
        
        if (destroyedAsteroid != null) {
            System.out.println("Word destroyed: " + typedWord);

            // Spawn projectile from bottom center toward the asteroid
            int startX = getWidth() / 2;           
            int startY = getHeight() - 50;
            int targetX = destroyedAsteroid.getX();
            int targetY = destroyedAsteroid.getY();
            projectiles.add(new Projectile(startX, startY, targetX, targetY));

            // play hit sound
            Utils.playSound("./assets/hit.wav");
        } else {
            System.out.println("No Match: " + typedWord);
        }

        inputHandler.resetEnter();
    }
}

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);

        // draw background
        if (background != null) {
            g.drawImage(background, 0, 0, getWidth(), getHeight(), null);
        } else {
            g.setColor(Color.ORANGE);
            g.fillRect(0, 0, getWidth(), getHeight());
        }


        // draw words(asteroids)
        wordManager.draw(g);

        // draw projectiles
        for (Projectile p : projectiles) {
            p.draw(g);
        }


        g.setColor(Color.WHITE);
        g.drawString("GamePanel running...", 10, 20);
        g.setColor(Color.ORANGE);
        g.drawString("Input: " + inputHandler.getCurrentInput(), 10, 50);

    }
}