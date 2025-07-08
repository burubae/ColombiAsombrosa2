// AudioBridge.js — puente completo entre JS y Unity

window.ExposeUnityAudioContext = function () {
  console.log("🚀 Ejecutando ExposeUnityAudioContext desde AudioBridge.js");

  const ctx = (
    window.unityInstance?.Module?.audioContext ||
    window.Module?.audioContext ||
    null
  );

  if (ctx) {
    window.UnityAudioContext = ctx;
    console.log("✅ UnityAudioContext asignado correctamente");

    if (window.unityInstance) {
      window.unityInstance.SendMessage("UnityAudioContext", "OnExposeAudioSuccess", "");
      console.log("📡 Mensaje enviado a UnityAudioContext");
    }
  } else {
    console.warn("⚠️ No se encontró audioContext ni en unityInstance ni en Module");
  }
};

// 🎬 Funciones para grabación desde Unity

window.StartJSRecording = function (fps) {
  console.log("🎥 Grabación iniciada con FPS:", fps);

  // Aquí puedes iniciar tu lógica real de grabación
  // Por ejemplo: capturar canvas, iniciar MediaRecorder, etc.

  window.isRecording = true;
};

window.StopJSRecording = function () {
  console.log("🛑 Grabación detenida");

  // Aquí detienes la grabación, guardas el video, etc.

  window.isRecording = false;
};

// 🧠 Centralizador para llamadas desde Unity
window.UnityCall = function (method, arg = null) {
  if (method === "StartRecording") {
    window.StartJSRecording(parseInt(arg));
  }
  if (method === "StopRecording") {
    window.StopJSRecording();
  }
};