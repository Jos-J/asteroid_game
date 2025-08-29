package src;

import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

public class InputHandler  implements KeyListener {
    private StringBuilder currentInput = new StringBuilder();
    private boolean enterPressed = false;

    @Override
    public void keyTyped(KeyEvent e) {
        char c = e.getKeyChar();
        if  (Character.isLetter(c)) {
            currentInput.append(c);
        }
    }

    @Override
    public void keyPressed(KeyEvent e) {
        int key = e.getKeyCode();

        if (key ==KeyEvent.VK_BACK_SPACE && currentInput.length() > 0) {
            currentInput.deleteCharAt(currentInput.length() - 1);
        } else if (key == KeyEvent.VK_ENTER) {
            enterPressed = true;
        }
       
    }
    @Override
    public void keyReleased(KeyEvent e) {

    }
    public String getCurrentInput() {
        return currentInput.toString();
    }

    public boolean isEnterPressed() {
        return enterPressed;
    }
        // clear input after submission 
    public void resetEnter() {
        enterPressed = false;
        currentInput.setLength(0); 
    }

}