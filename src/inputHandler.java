package src;

import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

public class InputHandler  implements KeyListener {
    private boolean leftPressed, rightPressed, upPressed, downPressed, spacePressed;

    @Override
    public void keyTyped(KeyEvent e) {

    }

    @Override
    public void keyPressed(KeyEvent e) {
        int key = e.getKeyCode();

        if (key == KeyEvent.VK_LEFT) leftPressed = true;
        if (key == KeyEvent.VK_RIGHT) rightPressed = true;
        if (key == KeyEvent.VK_UP)      upPressed = true;
        if (key == KeyEvent.VK_DOWN)  downPressed = true;
        if (key == KeyEvent.VK_SPACE) spacePressed = true;
    }

    @Override
    public void keyReleased(KeyEvent e)  {
        int key = e.getKeyCode();

        if (key == KeyEvent.VK_LEFT) leftPressed = false;
        if (key == KeyEvent.VK_RIGHT) rightPressed = false;
        if (key == KeyEvent.VK_UP)     upPressed = false;
        if (key == KeyEvent.VK_DOWN)   downPressed = false;
        if (key == KeyEvent.VK_SPACE)  spacePressed = false;
    }

    // checking state in GamePanel
    public boolean isLeftPressed() { return leftPressed; }
    public boolean isRightPressed() { return rightPressed; }
    public boolean isUpPressed() { return upPressed; }
    public boolean isDownPressed() { return downPressed; }
    public boolean isSpacePressed() { return spacePressed; }

}