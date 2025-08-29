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
        wordManager.update(getWidth(), getHeight()); 

        if (inputHandler.isEnterPressed()) {
            String typedWord = inputHandler.getCurrentInput();
            if (wordManager.checkAndDestroy(typedWord)) {
                 System.out.println("word destroyed: " + typedWord);
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


        g.setColor(Color.WHITE);
        g.drawString("GamePanel running...", 10, 20);

        g.setColor(Color.ORANGE);
        g.drawString("Input: " + inputHandler.getCurrentInput(), 10, 50);

    }
}