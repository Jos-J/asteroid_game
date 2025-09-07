import javax.sound.sampled.*;
import java.io.File;
import java.io.IOException;

public class Utils {

    // Play a WAV sound file
    public static void playSound(String filepath) {
        try {
            File file = new File(filepath);
            if (!file.exists()) {
                System.out.println("Sound file not found: " + filepath);
                return;
            }

            AudioInputStream audioStream = AudioSystem.getAudioInputStream(file);
            Clip clip = AudioSystem.getClip();
            clip.open(audioStream);
            clip.start();

        } catch (UnsupportedAudioFileException | IOException | LineUnavailableException e) {
            e.printStackTrace();
        }
    }
}
