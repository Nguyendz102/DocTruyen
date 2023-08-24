package com.example.assigmentclient;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.JsonRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.lang.ref.ReferenceQueue;

public class MainActivity extends AppCompatActivity {
    private EditText iduser,idtruyen,idnametruyen,date,noidung;
    private Button btn1,btnedit,btndelete;
    private RequestQueue referenceQueue;
    @SuppressLint("MissingInflatedId")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        referenceQueue = Volley.newRequestQueue(getApplicationContext());
        btn1 = findViewById(R.id.btn);
        iduser = findViewById(R.id.edUser);
        idnametruyen = findViewById(R.id.ednametruyen);
        idtruyen = findViewById(R.id.edidTruyen);
        date = findViewById(R.id.eddate);
        noidung= findViewById(R.id.edcontend);
        btnedit = findViewById(R.id.btnEdit);
        btndelete = findViewById(R.id.btndelete);
        btn1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                try {
                    JSONObject object = new JSONObject();
                    object.put("idUser",iduser.getText().toString());
                    object.put("idTruyen",idtruyen.getText().toString());
                    object.put("nameTruyen",idnametruyen.getText().toString());
                   object.put("date",date.getText().toString());
                   object.put("noidung",noidung.getText().toString());
                    JsonRequest jsonRequest = new JsonObjectRequest(Request.Method.POST, APIClass.API_POST, object, new Response.Listener<JSONObject>() {
                        @Override
                        public void onResponse(JSONObject response) {
                            Toast.makeText(getApplicationContext(), response.toString(), Toast.LENGTH_SHORT).show();
                        }
                    }, new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {

                        }
                    });
                    referenceQueue.add(jsonRequest);
                }catch (JSONException e){
                        e.printStackTrace();
                }
            }
        });
        btnedit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                try {
                    JSONObject object = new JSONObject();
                    object.put("idUser",iduser.getText().toString());
                    object.put("idTruyen",idtruyen.getText().toString());
                    object.put("nameTruyen",idnametruyen.getText().toString());
                    object.put("date",date.getText().toString());
                    object.put("noidung",noidung.getText().toString());
                    JsonRequest jsonRequest = new JsonObjectRequest(Request.Method.PUT, APIClass.API_EDIT, object, new Response.Listener<JSONObject>() {
                        @Override
                        public void onResponse(JSONObject response) {
                            Toast.makeText(getApplicationContext(), response.toString(), Toast.LENGTH_SHORT).show();
                        }
                    }, new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {

                        }
                    });
                    referenceQueue.add(jsonRequest);
                }catch (JSONException e){
                    e.printStackTrace();
                }
            }
        });

        btndelete.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                JsonRequest jsonRequest = new JsonObjectRequest(Request.Method.DELETE, APIClass.API_DELETE, null, new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        Toast.makeText(getApplicationContext(), response.toString(), Toast.LENGTH_SHORT).show();
                    }
                }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {

                    }
                });
                referenceQueue.add(jsonRequest);
            }
        });
    }
}