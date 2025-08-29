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

    // Manager & Game objects
    private  WordManager wordManager;
    private InputHander inputHander;

    //
    private Image background;


    public GamePanel() {
        setPreferredSize(new Dimension(800, 600)); // window size
        setFocusable(true);
        requestFocus();


        // Init managers
        wordManager = new WordManager();
        inputHander = new InputHander();

        addKeyListener(inputHander);

        // Load background image
        background = new ImageIcon("assets/backgoundImage.png").getImage();
    }

    // start of game loop
    public void startGame() {
        if(gameThread == nul || !running) {
            gameThread = new Thread(this);
            gameThread.start();
            running = true;
        }
    }

    @Override 
    pubic void run(){
        while (running) {
            long startTime = System.currentTimeMillis();

            update();   // update game logic
            repaint();  // render

            long endTime = System.currentTimeMillis();
            long sleepTime = FRAME_TIME - (endTime - startTime);

            if (sleepTime > 0) {
                try {
                    Thread.sleep(sleepTime);
                } catch (InterruptedExecption e) {
                    e.printStackTrace();
                }
            }
        }
    }

    private void update() {
        wordManager.update(); // move asteriods, check collision, etc.
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);

        // draw background
        g.drawImage(background, 0, 0, getWidth(), getHeight(), null);

        // draw words/asteroids
        wordManager.draw(g);
    }

}