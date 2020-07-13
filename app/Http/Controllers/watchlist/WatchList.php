<?php

namespace App\Http\Controllers\watchlist;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class WatchList extends Controller{

    public function index(){
        return view('watchlist/index', \compact('response'));
    }

    public function store(Request $request){
        $idsponsor = $request->idsponsor;
        $period = $request->period;
        $conection = \DB::connection('sqlsrv');
            $response = $conection->select("EXEC Sp_TreePerId ?, ?, ?",array($idsponsor, $period, 'ORG'));
        \DB::disconnect('sqlsrv');
        return \Response::json($response);
    }

    public function reloadTab(Request $request){
        $idsponsor = $request->idsponsor;
        $period = $request->period;
        $conection = \DB::connection('sqlsrv');
            $response = $conection->select("EXEC [dbo].[Sp_TreePerId] $idsponsor,$period, 'ORG'");
            //$response = $conection->select('EXEC Sp_TreePerId ?,?', array(14960100, 201909));
        \DB::disconnect('sqlsrv');
        $data = [
            'data' => $response,
        ];
        return \Response::json($data);
    }

    public function addAssoc(Request $request){
        $associateid = $request->input("associated");
        $idsponsor = $request->idsponsor;
        $conection = \DB::connection('sqlsrv');
            $response = $conection->select('SELECT * FROM Watch_List_Conf WHERE Owner_w = ? AND associateid = ?', array($idsponsor, $associateid));
            if(!empty($response)){
                $response = 0;
            }
            else{
                $response = $conection->insert('INSERT INTO Watch_List_Conf (Owner_w, associateid) VALUES (?, ?)', array($idsponsor, $associateid));
            }
        \DB::disconnect('sqlsrv');
        return \Response::json($response);
    }

    public function delAsoc(Request $request){
        $associateid = $request->id;
        $idsponsor = $request->idsponsor;
        $conection = \DB::connection('sqlsrv');
            $response = $conection->insert('DELETE FROM Watch_List_Conf WHERE Owner_w = ? AND associateid = ?', array($idsponsor, $associateid));
        \DB::disconnect('sqlsrv');
        return \Response::json($response);
    }

    public function saveTableConfig(Request $request){
        $idsponsor = $request->idsponsor;
        $line_number = $request->line_number;
        $levels = $request->levels;
        $name = $request->name;
        $consultant_id = $request->consultant_id;
        $email = $request->email;
        $mobile_number = $request->mobile_number;
        $alternative_num = $request->alternative_num;
        $country = $request->country;
        $pay_rank = $request->pay_rank;
        $distributor_status = $request->distributor_status;
        $inactive_months = $request->inactive_months;
        $renewal_date = $request->renewal_date;
        $period1 = $request->period1;
        $period2 = $request->period2;
        $period3 = $request->period3;

        $conection = \DB::connection('sqlsrv');
            $response = $conection->delete("DELETE FROM Config_Genealogy WHERE Owner_Genealogy = ?", array($idsponsor));
            $response = $conection->insert("INSERT INTO Config_Genealogy VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
            array(
                "$idsponsor", "$line_number", "$levels", "$consultant_id", "$email", "$mobile_number", "$alternative_num",
                "$country", "$pay_rank", "$distributor_status", "$inactive_months", "$renewal_date", "$period1", "$period2", "$period3", "false", "false"
            ));
        \DB::disconnect('sqlsrv');
        return \Response::json($response);
    }

    public function initTableConfig(Request $request){
        $sponsorid = $request->sponsorid;
        $conection = \DB::connection('sqlsrv');
            $response = $conection->select("SELECT * FROM Config_Genealogy WHERE Owner_Genealogy = ?", array($sponsorid));
        \DB::disconnect('sqlsrv');
        return \Response::json($response);
    }
}
