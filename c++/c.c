#include "raylib.h"
#include <stdio.h> 

#define WIDTH 800
#define HEIGHT 450


int main(){
 
    InitWindow(WIDTH, HEIGHT, "peut etre projet");
    int w = GetScreenWidth();
    int h = GetScreenHeight();
   

    while (!WindowShouldClose())
    {
        
        BeginDrawing();
        ClearBackground(BLACK);
        DrawText("Raylib works!", 190, 200, 20, RED);
        DrawRectangleLines(10,20,w,h,RED);
        EndDrawing();
    }
    CloseWindow();
    return 0;

}