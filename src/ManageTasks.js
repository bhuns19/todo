export async function getAllTasks() {

        const response = await fetch('http://127.0.0.1:5000/todos');
        let json = await response.json();
        return json
    
}
