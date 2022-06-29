export async function getAllTasks() {
  const response = await fetch("http://127.0.0.1:5000/todos");
  let json = await response.json();
  return json;
}

export async function postTask(postBody) {
  const response = await fetch("http://127.0.0.1:5000/todos", {
    method: "POST",
    body: JSON.stringify(postBody),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let json = await response.json();
  return json;
}

export async function patchTask(taskId, patchBody) {
  const response = await fetch(`http://127.0.0.1:5000/todos/${taskId}`, {
    method: "PATCH",
    body: JSON.stringify(patchBody),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let json = await response.json();
  return json;
}

export async function delTask(taskId) {
  const response = await fetch(`http://127.0.0.1:5000/todos/${taskId}`, {
    method: "DELETE",
  });
}
